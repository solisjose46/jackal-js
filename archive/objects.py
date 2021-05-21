f = open("objects_format.txt", "a")

with open("objects.txt", "r") as filestream:
    for line in filestream:
        currentline = line.split(", ")
        obj = """{{\n\theight: {},\n\twidth: {},\n\tleft: {},\n\ttop: {}\n}},\n""".format(currentline[0], currentline[1], currentline[2], currentline[3])
        print(obj)
        f.write(obj)

f.close()