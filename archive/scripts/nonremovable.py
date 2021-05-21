f = open("nonremoveable_format.txt", "a")

with open("nonremoveable.txt", "r") as filestream:
    for line in filestream:
        currentline = line.split(", ")
        obj = """{{\n\theight: '{}px',\n\twidth: '{}px',\n\tleft: '{}px',\n\ttop: '{}px'\n}},\n""".format(currentline[0], currentline[1], currentline[2], currentline[3])
        print(obj)
        f.write(obj)

f.close()