import re

from django.test import TestCase
from django.urls import reverse

from .tour_data import CASTLES


class TourPageTests(TestCase):
    def setUp(self):
        self.response = self.client.get(reverse('main:tour'))
        self.html = self.response.content.decode()

    def test_page_opens(self):
        self.assertEqual(self.response.status_code, 200)

    def test_all_slides_rendered(self):
        # обложка + приветствие + маршрут + 7 дней + что входит + бронирование
        self.assertEqual(self.html.count('class="slide '), 5 + len(CASTLES))

    def test_every_castle_has_a_slide(self):
        for castle in CASTLES:
            self.assertIn(f'id="day-{castle["day"]}"', self.html)

    def test_map_coordinates_use_dot(self):
        # В русской локали Django пишет 166,7 — SVG такое не понимает
        coords = re.findall(r'<circle class="map__dot" cx="([^"]+)" cy="([^"]+)"', self.html)
        self.assertEqual(len(coords), len(CASTLES))
        for cx, cy in coords:
            self.assertNotIn(',', cx + cy)

    def test_tour_is_home_page(self):
        self.assertEqual(reverse('main:tour'), '/')
