# process.py
#
# Converts .terra files to images

from pixelgrid import *
import tkinter as tk
import json
import csv
import time

def rgb(hex_color):
    split = (hex_color[1:3], hex_color[3:5], hex_color[5:7])
    return tuple([int(x, 16) for x in split])

designation = "build/images/"
    
tk.Tk() # Initialize Tk system

pixelgrid = PixelGrid([(0,0,0)])
with open("images/robotgirl.terra", "r") as fileo:
    pixelgrid.load(json.load(fileo))
filen = designation + "player.gif"
pixelgrid.changepage(0)
pixelgrid.getTkStrip(4, False).write(filen, format='gif')

with open("images/greenhouse.terra", "r") as fileo:
    pixelgrid.load(json.load(fileo))
filen = designation + "level1.gif"
pixelgrid.changepage(0)
pixelgrid.getTkStrip(2, False).write(filen, format='gif')

