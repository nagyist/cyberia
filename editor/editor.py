import tkinter as tk 
from PIL import ImageTk, Image
#from enum import Enum
import math
from tilesets import tilesets
from bigtiles import Bigtiles
from level import Level

class Editor(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.master = master
        self.pack()

        self.level = 0
        self.bigtiles = Bigtiles(9, tilesets.tiles[0])
        self.currentlevel = Level(10,10)
        self.tileset = 0
        self.selected_tile = 0

        self.buildGUI()
    
    def buildGUI(self):
        commandbar = tk.Frame(self)
        commandbar.grid(row=0, column=0, columnspan=2)
        loadbutton = tk.Button(commandbar, text="Open")
        loadbutton.grid(row=0, column=0)
        savebutton = tk.Button(commandbar, text="Save")
        savebutton.grid(row=0, column=1)

        tilegrid = tk.Frame(self, width=256)
        tilegrid.grid(row=1, column=0, sticky=tk.N)
        scrolltiles = tk.Scrollbar(tilegrid, orient=tk.HORIZONTAL)
        self.tilecanvas = tk.Canvas(
            tilegrid, scrollregion=(0, 0, 32*255, 32), height=32,
            xscrollcommand=scrolltiles.set
        )
        self.tilecanvas.img = self.tilecanvas.create_image(
            0, 0, anchor=tk.NW
        )
        self.tilecanvas.pack(fill=tk.X)
        scrolltiles.pack(fill=tk.X)
        scrolltiles.config(command=self.tilecanvas.xview)
        self.buildTileset(0)
        
        def clickTilecanvas(e):
            x = math.floor(self.tilecanvas.canvasx(e.x) / 32)
            self.selectTile(x)
        self.tilecanvas.bind("<Button-1>", clickTilecanvas)

        tileframe = tk.Frame(tilegrid)
        tileframe.pack()

        tk.Label(tileframe, text="Current tile:").grid(row=0, column=0)
        self.selectedtile = tk.Label(tileframe)
        self.selectTile(7)
        self.selectedtile.grid(row=1, column=0)

        tk.Label(tileframe, text="TODO: Solidity").grid(row=0, column=1)

        scrollbigtiles = tk.Scrollbar(tilegrid, orient=tk.HORIZONTAL)
        self.bigtilecanvas = tk.Canvas(
            tilegrid, scrollregion=(0, 0, 16*255, 64), height=64,
            xscrollcommand=scrollbigtiles.set
        )
        self.bigtilecanvas.img = self.bigtilecanvas.create_image(
            0, 0, anchor=tk.NW
        )
        self.bigtilecanvas.pack(fill=tk.X)
        scrollbigtiles.pack(fill=tk.X)
        scrollbigtiles.config(command=self.bigtilecanvas.xview)
        self.buildBigTileset(0)

        def clickBigtilecanvas(e):
            x = math.floor(self.bigtilecanvas.canvasx(e.x) / 64)
            self.selectBigtile(x)
        self.bigtilecanvas.bind("<Button-1>", clickBigtilecanvas)

        bigtileframe = tk.Frame(tilegrid)
        bigtileframe.pack()

        tk.Label(bigtileframe, text="Current bigtile:").grid(row=0, column=0)
        self.selectedbigtile = tk.Canvas(bigtileframe, width=128, height=128)
        self.selectedbigtile.image = self.selectedbigtile.create_image(0, 0, anchor=tk.NW)
        self.selectBigtile(0)
        self.selectedbigtile.grid(row=1, column=0)
        
        def clickBigtile(e):
            x = math.floor(self.selectedbigtile.canvasx(e.x) / 32)
            y = math.floor(self.selectedbigtile.canvasy(e.y) / 32)
            self.bigtiles.set(
                self.selected_bigtile,
                x, y,
                self.selected_tile)
            self.selectBigtile()
        self.selectedbigtile.bind("<Button-1>", clickBigtile)
        self.selectedbigtile.bind("<B1-Motion>", clickBigtile)

        def rclickBigtile(e):
            x = math.floor(self.selectedbigtile.canvasx(e.x) / 32)
            y = math.floor(self.selectedbigtile.canvasy(e.y) / 32)
            self.selectTile(
                self.bigtiles.get(self.selected_bigtile, x, y)
            )
        self.selectedbigtile.bind("<Button-3>", rclickBigtile)

        bigtileoptions = tk.Frame(bigtileframe)
        bigtileoptions.grid(row=0, rowspan=2, column=1)
        tk.Button(bigtileoptions,
                  text="Refresh bigtile list",
                  command=self.buildBigTileset).pack()
        tk.Button(bigtileoptions,
                  text="Refresh room",
                  command=self.drawroom).pack()

        rightpanel = tk.Frame(self)
        rightpanel.grid(row=1, column=1)

        levelpanel = tk.Frame(rightpanel)
        levelpanel.grid(row=1, column=0)
        levelxscroll = tk.Scrollbar(levelpanel, orient=tk.HORIZONTAL)
        levelyscroll = tk.Scrollbar(levelpanel)
        levelxscroll.grid(row=1, column=0, sticky=tk.W + tk.E)
        levelyscroll.grid(row=0, column=1, sticky=tk.N + tk.S)
        self.levelcanvas = tk.Canvas(
            levelpanel, width=20*32, height=20*32,
            xscrollcommand=levelxscroll.set,
            yscrollcommand=levelyscroll.set)
        levelxscroll.config(command=self.levelcanvas.xview)
        levelyscroll.config(command=self.levelcanvas.yview)
        self.levelcanvas.grid(row=0, column=0)
        self.levelcanvas.image = self.levelcanvas.create_image(0, 0, anchor=tk.NW)
        self.drawroom()

        def clickLevel(e):
            x = math.floor(self.levelcanvas.canvasx(e.x) / 64)
            y = math.floor(self.levelcanvas.canvasy(e.y) / 64)
            self.currentlevel.set(
                x, y,
                self.selected_bigtile)
            self.drawroom()
        self.levelcanvas.bind("<Button-1>", clickLevel)
        self.levelcanvas.bind("<B1-Motion>", clickLevel)

        def rclickLevel(e):
            x = math.floor(self.levelcanvas.canvasx(e.x) / 64)
            y = math.floor(self.levelcanvas.canvasy(e.y) / 64)
            self.selectBigtile(self.currentlevel.get(x, y))
        self.levelcanvas.bind("<Button-3>", rclickLevel)

    
    def buildTileset(self, tiles):
        self.tiles = ImageTk.PhotoImage(tilesets.tilesets2x[tiles])
        self.tilecanvas.itemconfig(
            self.tilecanvas.img, image=self.tiles
        )

    def buildBigTileset(self, tiles=-1):
        #TODO: Handle different sets of bigtiles
        self.bigtilesimg = ImageTk.PhotoImage(self.bigtiles.draw())
        self.bigtilecanvas.itemconfig(
            self.bigtilecanvas.img, image=self.bigtilesimg
        )
    
    def selectTile(self, i):
        self.selected_tile = i
        self.selectedtile.img = ImageTk.PhotoImage(tilesets.tiles2x[self.tileset][i])
        self.selectedtile.config(image=self.selectedtile.img)

    def selectBigtile(self, i=-1):
        if i == -1:
            i = self.selected_bigtile
        else:
            self.selected_bigtile = i
        self.selectedbigtile.img = ImageTk.PhotoImage(self.bigtiles.drawtile2x(i))
        self.selectedbigtile.itemconfig(
            self.selectedbigtile.image, 
            image=self.selectedbigtile.img)

    def drawroom(self):
        self.levelcanvas.img = ImageTk.PhotoImage(self.currentlevel.draw(self.bigtiles))
        self.levelcanvas.itemconfig(
            self.levelcanvas.image,
            image=self.levelcanvas.img
        )
        
        

root = tk.Tk()
Editor(root).mainloop()