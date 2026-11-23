"""Содержимое презентации «A Journey Through England's Historic Castles».

Тексты перенесены со слайдов. Координаты (lat, lon) нужны для схемы маршрута.
Чтобы поправить текст на сайте, достаточно изменить этот файл.
"""

TOUR = {
    'kicker': 'Tour programme · 7 days',
    'title': "A Journey Through England's Historic Castles",
    'subtitle': 'Tour of English Castles: seven days, seven fortresses and '
                'nearly a thousand years of history.',
    'authors': 'Иванова Юлия и Алова Ольга',
    'course': '1 курс МПФ',
    'hero_photo': 'img/tour/hero-alnwick.jpg',
    'welcome_title': 'Walk through a thousand years of English history',
    'welcome_text': "From the Norman conquest to the castles of the wild northern coast, "
                    "this tour brings the stories of England's kings, queens and knights to life.",
    'stats': [
        {'value': 7, 'label': 'Days', 'text': 'A relaxed pace with time to explore and take photographs'},
        {'value': 7, 'label': 'Castles', 'text': 'Royal palaces, medieval fortresses and coastal strongholds'},
        {'value': 3, 'label': 'Regions', 'text': 'London and the South East, the Midlands and the North East'},
    ],
    'included': [
        'Entrance tickets to all seven castles',
        'Comfortable coach and rail transfers',
        'Six nights in hand-picked hotels',
        'Breakfast every day',
        'An English-speaking tour guide',
    ],
    'not_included': [
        'International flights',
        'Lunches and dinners',
        'Travel insurance',
        'Personal expenses and souvenirs',
    ],
    'price': 400,
    'phone_display': '+7 (876) 073-99-17',
    'phone_tel': '+78760739917',
    'brand': 'OlyaJulia',
    'final_photo': 'img/tour/windsor-aerial.jpg',
}

# Группы регионов для фильтра на слайде с маршрутом
REGION_GROUPS = [
    {'key': 'south-east', 'label': 'London & South East'},
    {'key': 'midlands', 'label': 'Midlands'},
    {'key': 'north-east', 'label': 'North East'},
]

CASTLES = [
    {
        'day': 1, 'slug': 'tower', 'name': 'Tower of London',
        'region': 'London', 'group': 'south-east',
        'experience': 'Crown Jewels and a Yeoman Warder tour',
        'lead': 'A royal fortress begun by William the Conqueror after 1066, '
                'and now a UNESCO World Heritage Site.',
        'highlights': [
            'See the Crown Jewels up close',
            'Join a Yeoman Warder (“Beefeater”) tour full of stories',
            'Walk around the White Tower and the ancient walls',
        ],
        'photos': ['img/tour/tower.jpg'],
        'lat': 51.508, 'lon': -0.076,
    },
    {
        'day': 2, 'slug': 'windsor', 'name': 'Windsor Castle',
        'region': 'Berkshire', 'group': 'south-east',
        'experience': "State Apartments and St George's Chapel",
        'lead': 'The oldest and largest inhabited castle in the world, '
                'and an official residence of the monarch.',
        'highlights': [
            'Tour the lavish State Apartments',
            "Visit St George's Chapel, a masterpiece of Gothic architecture",
            'Stroll through the historic town of Windsor',
        ],
        'photos': ['img/tour/windsor-2.jpg', 'img/tour/windsor-1.jpg'],
        'lat': 51.483, 'lon': -0.604,
    },
    {
        'day': 3, 'slug': 'warwick', 'name': 'Warwick Castle',
        'region': 'Warwickshire', 'group': 'midlands',
        'experience': 'Great Hall, towers and the trebuchet',
        'lead': 'A medieval fortress above the River Avon, founded in 1068 '
                'and full of living history.',
        'highlights': [
            "Climb Guy's Tower and Caesar's Tower for sweeping views",
            "Explore the Great Hall and the castle's armoury",
            'Watch the trebuchet in action',
        ],
        'photos': ['img/tour/warwick.jpg'],
        'lat': 52.279, 'lon': -1.585,
    },
    {
        'day': 4, 'slug': 'alnwick', 'name': 'Alnwick Castle',
        'region': 'Northumberland', 'group': 'north-east',
        'experience': 'State Rooms and famous film locations',
        'lead': 'The home of the Percy family for about seven hundred years, '
                'set in the green hills of the north.',
        'highlights': [
            'Visit the richly decorated State Rooms',
            'Recognise the castle from the Harry Potter films',
            'Enjoy the journey north through the English countryside',
        ],
        'photos': ['img/tour/alnwick-2.jpg', 'img/tour/alnwick-1.jpg'],
        'lat': 55.416, 'lon': -1.706,
    },
    {
        'day': 5, 'slug': 'bamburgh', 'name': 'Bamburgh Castle',
        'region': 'Northumberland', 'group': 'north-east',
        'experience': 'Coastal ramparts and sea views',
        'lead': 'A dramatic fortress on a rocky outcrop above the North Sea, '
                'once a royal seat of the kings of Northumbria.',
        'highlights': [
            'Walk the ramparts with views of the sea and beach',
            "Explore the historic rooms and the castle's collections",
            'Take a coastal walk along the golden sands',
        ],
        'photos': ['img/tour/bamburgh.jpg'],
        'lat': 55.609, 'lon': -1.710,
    },
    {
        'day': 6, 'slug': 'leeds', 'name': 'Leeds Castle',
        'region': 'Kent', 'group': 'south-east',
        'experience': 'Lake setting, gardens and the maze',
        'lead': 'A romantic castle built on islands in a lake, '
                'once a home of medieval queens.',
        'highlights': [
            'Stroll through the gardens and parkland',
            'Find your way through the hedge maze to the grotto',
            'Photograph the castle reflected in the water',
        ],
        'photos': ['img/tour/leeds-1.jpg', 'img/tour/leeds-2.jpg'],
        'lat': 51.249, 'lon': 0.630,
    },
    {
        'day': 7, 'slug': 'dover', 'name': 'Dover Castle',
        'region': 'Kent', 'group': 'south-east',
        'experience': 'Roman lighthouse and wartime tunnels',
        'lead': 'Known for centuries as the “Key to England”, high above '
                'the white cliffs and the English Channel.',
        'highlights': [
            'See the Roman lighthouse beside the castle church',
            'Explore the Secret Wartime Tunnels',
            'Enjoy the view across the Channel before our farewell',
        ],
        'photos': ['img/tour/dover-1.jpg', 'img/tour/dover-2.jpg'],
        'lat': 51.129, 'lon': 1.323,
    },
]

# Подписи на схеме: с какой стороны от точки писать название,
# чтобы близкие замки (Alnwick/Bamburgh, Tower/Windsor) не наезжали друг на друга.
LABEL_SIDE = {
    'tower': 'right-up', 'windsor': 'left', 'warwick': 'right',
    'alnwick': 'right-down', 'bamburgh': 'right-up', 'leeds': 'left-down', 'dover': 'right',
}


def route_map(width=360, pad=34, label_room=120):
    """Переводит широту/долготу в координаты SVG (простая равнопромежуточная проекция)."""
    import math

    lats = [c['lat'] for c in CASTLES]
    lons = [c['lon'] for c in CASTLES]
    lat_min, lat_max = min(lats), max(lats)
    lon_min, lon_max = min(lons), max(lons)
    k = math.cos(math.radians((lat_min + lat_max) / 2))  # сжатие долготы на широте Англии

    span_x = (lon_max - lon_min) * k
    span_y = lat_max - lat_min
    scale = (width - 2 * pad - label_room) / span_x
    height = round(span_y * scale + 2 * pad)
    off_x = (width - span_x * scale) / 2 - 20

    points = []
    for c in CASTLES:
        x = off_x + (c['lon'] - lon_min) * k * scale
        y = pad + (lat_max - c['lat']) * scale
        side = LABEL_SIDE.get(c['slug'], 'right')
        anchor = 'end' if side.startswith('left') else 'start'
        dx = -14 if anchor == 'end' else 14
        dy = -8 if side.endswith('up') else (14 if side.endswith('down') else 4)
        points.append({**c, 'x': round(x, 1), 'y': round(y, 1),
                       'lx': round(x + dx, 1), 'ly': round(y + dy, 1), 'anchor': anchor})
    path = ' '.join(f"{'M' if i == 0 else 'L'}{p['x']},{p['y']}" for i, p in enumerate(points))
    return {'width': width, 'height': height, 'points': points, 'path': path}
