from PIL import Image

"""A level class consists of a level. A level is a grid of Bigtiles"""
class Level():
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.grid = [0 for i in range(0, width*height)]

    def set(self, x, y, i):
        self.grid[x+y*self.width] = i
    
    def get(self, x, y):
        return self.grid[x+y*self.width]
    
    def draw(self, bigtiles):
        img = Image.new("RGB", (64*self.width, 64*self.height))

        def paste(x, y, j):
            img.paste(bigtiles.drawtile(j), box=(x*64, y*64))

        for i in range(0, len(self.grid)):
            paste(i % self.width, i // self.width, self.grid[i])
    
        return img
