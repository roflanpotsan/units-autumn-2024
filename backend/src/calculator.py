import math


class Calculator:

    def __init__(self):
        pass

    def addition(self, x1: int | float, x2: int | float):
        return x1 + x2

    def multiplication(self, x1: int | float, x2: int | float):
        return x1 * x2

    def subtraction(self, x1: int | float, x2: int | float):
        return x1 - x2

    def division(self, x1: int | float, x2: int | float):
        if x2 != 0:
            return x1 / x2

    def absolute(self, x: int | float):
        return abs(x)

    def degree(self, x: int | float, n: int | float):
        return x ** n

    def ln(self, x: int | float):
        return math.log(x)

    def log(self, x: int | float, n: int | float):
        return math.log(x, n)

    def sqrt(self, x: int | float):
        return x ** 0.5

    def nth_root(self, x: int | float, n: int | float):
        return x ** (1. / n)
