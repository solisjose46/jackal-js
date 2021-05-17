# obj = """{{\n\tx: {},\n\ty: {}\n}},"""

# print(obj.format(1, 2))

f = open("bounds_format.txt", "a")



with open("bounds.txt", "r") as filestream:
    for line in filestream:
        currentline = line.split(", ")
        obj = """{{\n\tx: {},\n\ty: {}\n}},\n""".format(currentline[0], currentline[1])
        print(obj)
        f.write(obj)

f.close()