__author__ = 'peter'

def accessprofile(original_function):
    def inner(*args, **kwargs):
        #logico de construccion de opciones habilitadas en el dashboard
        # se trae los objectos - modelos corresponde, se alteran los formularios
        # correspondientes y se sobreescribe kwargs
        return original_function(*args, **kwargs)

    return inner
