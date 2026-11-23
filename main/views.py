from django.shortcuts import render

from .tour_data import CASTLES, REGION_GROUPS, TOUR, route_map


def tour(request):
    """Интерактивная презентация тура по замкам Англии."""
    castles = []
    for i, castle in enumerate(CASTLES):
        nxt = CASTLES[i + 1]['name'] if i + 1 < len(CASTLES) else None
        castles.append({**castle, 'next_name': nxt})

    return render(request, 'main/tour.html', {
        'tour': TOUR,
        'castles': castles,
        'regions': REGION_GROUPS,
        'route': route_map(),
    })
