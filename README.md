sysadminbit
===========

Software de multifuncional
* Estado del Proyecto: Inicial - Maquetacion

Configuracion Inicial
=====================

INSTALAR LOS SIGUIENTES PAQUETES INICIALES PARA EL SERVIDOR DE SYSADMINBIT

* apt-get install python-dev gcc  postgresql python-psycopg2 git
* pip install django
* pip install south
* pip install crispy-forns
* pip install django-crispy
* pip install django-crispy-forms
* pip install django-extensions
* pip install django-celery

Configuracion inicial de git - de como realizar un commit inicial a github
Crear acceso ssh mediante documentacion https://help.github.com/articles/generating-ssh-keys
* ssh -T git@github.com

mkdir ./ProjectoSysadminbit/; cd ./ProjectoSysadminbit/
git init
git add .
git commit -m "Instacia primera de sysadminbit"
git remote add origin git@github.com:sysadminbit/sysadminbit.bit
git pull origin
git push origin master
#Tambien se puede realizar en forma directa sin usar git remote add
git pull git@github.com:sysadminbit/sysadminbit.bit
git push git@github.com:sysadminbit/sysadminbit.bit
.

#Actualizacion
git remote add origin https://username:password@github.com/sysadminbit/sysadminbit.git


South
======
* Hacer un syncdb sin ninguna app
* Migrar una app de manera inicial
python manage.py schemamigration core --initial
python manage.py migrate core
* Por cada actualizacion
python manage.py schemamigration core --auto
python manage.py migrate core


