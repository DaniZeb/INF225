import unittest
import requests

class TestRegisterEndpoint(unittest.TestCase):
    BASE_URL = 'http://localhost:8000/api'  

    @classmethod
    def setUpClass(cls):
        cls.session = requests.Session()
        cls.test_user = {
            'name': 'pruebas2',
            'email': 'pruebas2@example.com',
            'password': 'password2'
        }

    @classmethod
    def tearDownClass(cls):
        cls.session.close()

    def test_1_successful_registration(self):
        response = self.session.post(f'{self.BASE_URL}/register', data=self.test_user)
        self.assertEqual(response.status_code, 201)

    def test_2_failed_registration_due_to_duplicate_email(self):
        response = self.session.post(f'{self.BASE_URL}/register', data=self.test_user)
        self.assertEqual(response.status_code, 400)

class TestLoginEndpoint(unittest.TestCase):
    BASE_URL = 'http://localhost:8000/api'  

    @classmethod
    def setUpClass(cls):
        cls.session = requests.Session()
        cls.test_user = {
            'email': 'pruebas2@example.com',
            'password': 'password2'
        }

    @classmethod
    def tearDownClass(cls):
        cls.session.close()

    def test_3_successful_login(self):
        response = self.session.post(f'{self.BASE_URL}/login', data=self.test_user)
        self.assertEqual(response.status_code, 200)

    def test_4_failed_login_due_to_incorrect_password(self):
        self.test_user['password'] = 'wrongpassword'
        response = self.session.post(f'{self.BASE_URL}/login', data=self.test_user)
        self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    suite = unittest.TestSuite()
    suite.addTest(TestRegisterEndpoint('test_1_successful_registration'))
    suite.addTest(TestRegisterEndpoint('test_2_failed_registration_due_to_duplicate_email'))
    suite.addTest(TestLoginEndpoint('test_3_successful_login'))
    suite.addTest(TestLoginEndpoint('test_4_failed_login_due_to_incorrect_password'))
    runner = unittest.TextTestRunner()
    runner.run(suite)
