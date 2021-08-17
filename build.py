import os
from optparse import OptionParser
import shutil
dir_path = './out/my-app-win32-x64'

parser = OptionParser()
parser.add_option("-v", "--version", dest="version",
                  help="the version", metavar="ver")
(options, args) = parser.parse_args()

def replaceTextBetween(originalText, delimeterA, delimterB, replacementText):
    leadingText = originalText.split(delimeterA)[0]
    trailingText = originalText.split(delimterB)[1]
    return leadingText + delimeterA + replacementText + delimterB + trailingText

str1 = open("src/index.html", "r", encoding='utf-8').read()
str1 = replaceTextBetween(str1,'<title>','</title>', options.version)

fout = open("src/index.html", 'w', encoding='utf-8')
fout.write(str1)
fout.close()
# exit()
os.system('npm run make')
os.remove(options.version+'.zip')

shutil.make_archive(options.version, 'zip', './out/my-app-win32-x64')