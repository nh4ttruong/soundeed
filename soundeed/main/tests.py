from django.test import TestCase, SimpleTestCase

# Create your tests here.
class SimpleTests(SimpleTestCase):
    def test_home_page_status(self):
        res = self.client.get('/')
        self.assertEquals(res.status_code, 200)
        