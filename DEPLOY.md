# Деплой на PythonAnywhere

Везде ниже замените `LOGIN` на ваш логин PythonAnywhere и `GITHUB_USER` на логин GitHub.

## 1. Загрузить код на GitHub (на своём компьютере)

Создайте пустой репозиторий `mysite` на github.com (без README), затем:

```bash
git remote add origin https://github.com/GITHUB_USER/mysite.git
git branch -M main
git push -u origin main
```

## 2. Установить проект (Bash console на PythonAnywhere)

```bash
git clone https://github.com/GITHUB_USER/mysite.git
cd mysite
python3.13 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

cp .env.example .env
python -c "from django.core.management.utils import get_random_secret_key as g; print(g())"
nano .env        # вставьте ключ, DJANGO_ALLOWED_HOSTS=LOGIN.pythonanywhere.com

python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

## 3. Создать веб-приложение (вкладка Web)

1. **Add a new web app** → **Manual configuration** → **Python 3.13**.
2. **Virtualenv:** `/home/LOGIN/mysite/.venv`
3. **Static files:** URL `/static/` → Directory `/home/LOGIN/mysite/staticfiles`
4. **Force HTTPS:** включить.
5. Откройте **WSGI configuration file**, удалите всё содержимое и вставьте:

```python
import os
import sys

path = '/home/LOGIN/mysite'
if path not in sys.path:
    sys.path.insert(0, path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

6. Нажмите **Reload**. Сайт: `https://LOGIN.pythonanywhere.com`

## Обновление сайта

Локально: `git add . && git commit -m "..." && git push`

На PythonAnywhere (Bash console):

```bash
cd ~/mysite && source .venv/bin/activate
git pull
pip install -r requirements.txt      # если менялись зависимости
python manage.py migrate             # если менялись модели
python manage.py collectstatic --noinput
```

Затем **Reload** на вкладке Web.

## Если что-то не работает

Вкладка Web → **Error log**: там будет точная ошибка.
- `DisallowedHost`: проверьте `DJANGO_ALLOWED_HOSTS` в `.env`.
- Нет стилей: проверьте пути в Static files и запустите `collectstatic`.
