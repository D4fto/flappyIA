def met1(n):
    total_sum = 0
    for i in range(n):
        total_sum += 5 ** i
    return total_sum

def met2(n):
    return (4 + 5 * (5 ** (n - 1) - 1)) / 4

n = 1
while True:
    x1 = met1(n)
    x2 = met2(n)
    print(f"{n}, {x1}, {x2}, {x1 == x2}")
    if x1 != x2:
        break
    n += 1
