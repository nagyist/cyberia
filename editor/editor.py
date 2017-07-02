import tkinter as tk 
from PIL import ImageTk, Image
from enum import Enum

class Editor(tk.Frame):
    def __init__(self, master=None):
        tk.Frame.__init__(self, master)
        self.master = master
        self.pack()

root = tk.Tk()
Editor(root).mainloop()