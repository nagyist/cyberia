from PIL import Image

"""Images contains images for the editor that aren't used in-game"""

class _Images():
    def __init__(self):
        solidityimg = Image.open("./images/solidity.gif")
        self.solidity = [solidityimg.crop((x*32, 0, x*32+32, 32)) 
                         for x in range(solidityimg.width//32)]

images = _Images()