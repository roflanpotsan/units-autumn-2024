import unittest
from src.calculator import Calculator


class TestCalculator(unittest.TestCase):

    def setUp(self):
        self.calculator = Calculator()

    # Тесты для сложения
    def test_addition_integers(self):
        self.assertEqual(self.calculator.addition(1, 2), 3)

    def test_addition_integers_polar(self):
        self.assertEqual(self.calculator.addition(1, -2), -1)

    def test_addition_floats(self):
        self.assertAlmostEqual(self.calculator.addition(1.5, 2.5), 4.0)

    def test_addition_floats_polar(self):
        self.assertAlmostEqual(self.calculator.addition(-1.5, -2.5), -4.0)

    def test_addition_zero(self):
        self.assertEqual(self.calculator.addition(0, 0), 0)

    def test_addition_infinity(self):
        self.assertEqual(self.calculator.addition(float('inf'), 5), float('inf'))

    # Тесты для вычитания
    def test_subtraction_integers(self):
        self.assertEqual(self.calculator.subtraction(5, 2), 3)
    
    def test_subtraction_integers_polar(self):
        self.assertEqual(self.calculator.subtraction(-1, -2), 1)

    def test_subtraction_floats(self):
        self.assertEqual(self.calculator.subtraction(5.5, 2.5), 3.0)

    def test_subtraction_zero(self):
        self.assertEqual(self.calculator.subtraction(0, 0), 0)

    def test_subtraction_infinity(self):
        self.assertEqual(self.calculator.subtraction(float('inf'), 5), float('inf'))

    # Тесты для умножения
    def test_multiplication_integers(self):
        self.assertEqual(self.calculator.multiplication(2, 3), 6)

    def test_multiplication_floats(self):
        self.assertEqual(self.calculator.multiplication(2.5, 4.0), 10.0)

    def test_multiplication_zero(self):
        self.assertEqual(self.calculator.multiplication(5, 0), 0)

    def test_multiplication_infinity(self):
        self.assertEqual(self.calculator.multiplication(5, float('inf')), float('inf'))

    # Тесты для деления
    def test_division_integers(self):
        self.assertEqual(self.calculator.division(6, 2), 3)

    def test_division_floats(self):
        self.assertEqual(self.calculator.division(6.0, 2.0), 3.0)

    def test_division_zero_divisor(self):
        self.assertIsNone(self.calculator.division(5, 0))

    def test_division_infinity(self):
        self.assertEqual(self.calculator.division(float('inf'), 2), float('inf'))

    # Тесты для абсолютного значения
    def test_absolute_integers(self):
        self.assertEqual(self.calculator.absolute(-5), 5)

    def test_absolute_floats(self):
        self.assertEqual(self.calculator.absolute(-5.5), 5.5)

    def test_absolute_zero(self):
        self.assertEqual(self.calculator.absolute(0), 0)

    # Тесты для возведения в степень
    def test_degree_integers(self):
        self.assertEqual(self.calculator.degree(2, 3), 8)

    def test_degree_floats(self):
        self.assertEqual(self.calculator.degree(2.5, 2), 6.25)

    def test_degree_zero(self):
        self.assertEqual(self.calculator.degree(5, 0), 1)

    def test_degree_infinity(self):
        self.assertEqual(self.calculator.degree(float('inf'), 1), float('inf'))

    # Тесты для натурального логарифма
    def test_ln_positive(self):
        self.assertAlmostEqual(self.calculator.ln(1), 0.0)

    def test_ln_infinity(self):
        self.assertEqual(self.calculator.ln(float('inf')), float('inf'))

    def test_ln_invalid(self):
        self.assertRaises(ValueError, self.calculator.ln, -1)

    # Тесты для логарифма по основанию n
    def test_log_base10(self):
        self.assertAlmostEqual(self.calculator.log(100, 10), 2)

    def test_log_base_invalid(self):
        self.assertRaises(ValueError, self.calculator.log, 100, -10)

    # Тесты для квадратного корня
    def test_sqrt_positive(self):
        self.assertEqual(self.calculator.sqrt(9), 3)

    def test_sqrt_zero(self):
        self.assertEqual(self.calculator.sqrt(0), 0)

    def test_sqrt_negative(self):
         self.assertAlmostEqual(self.calculator.sqrt(-9), (1.8e-16 + 3j))

    # Тесты для корня n-й степени
    def test_nth_root(self):
        self.assertEqual(self.calculator.nth_root(27, 3), 3)

    def test_nth_root_negative(self):
        self.assertAlmostEqual(self.calculator.nth_root(-27, 3), (1.5 + 2.598076211353316j))
    
    def test_nth_root_zero_division(self):
        self.assertRaises(ZeroDivisionError, self.calculator.nth_root, 27,0)


if __name__ == "__main__":
    unittest.main()
