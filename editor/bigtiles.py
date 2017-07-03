from PIL import Image

"""Bigtiles handles a set of 64x64 tiles"""

class Bigtiles():
    def __init__(self, length, tiles):
        self.length = length
        self.tiles = tiles

        self._bigtiles = {}
        self._drawcache = {}
        self._fullcache = None
        self._null = [0 for i in range(0, 4*4)]
        self._nulldraw = Image.new("RGB", (16*4, 16*4))

    def get(self, i, x, y):
        if i in self._bigtiles:
            return self._bigtiles[i][x+4*y]
        else:
            return 0
    
    def set(self, i, x, y, j):
        if i not in self._bigtiles:
            self._bigtiles[i] = [0 for i in range(0, 4*4)]
        self._bigtiles[i][x+4*y] = j
        self._drawcache.pop(i, None)
        self._fullcache = None
    
    def drawtile(self, i):
        if i not in self._bigtiles:
            return self._nulldraw
        if i in self._drawcache:
            return self._drawcache[i]
        img = Image.new("RGB", (16*4, 16*4))

        def drawTile(x, y, j):
            img.paste(self.tiles[j], box=(x*16, y*16))

        for k in range(0,16):
            drawTile(k % 4, k // 4, self._bigtiles[i][k])
        
        self._drawcache[i] = img
        return img
    
    def drawtile2x(self, i):
        img = self.drawtile(i)
        return img.resize((img.width*2, img.height*2), Image.NEAREST)
    
    def draw(self):
        if self._fullcache is not None:
            return self._fullcache

        img = Image.new("RGB", (16*4*self.length, 16*4))

        for i in range(0, self.length):
            img.paste(self.drawtile(i), box=(i*64, 0))

        self._fullcache = img
        return img
            
