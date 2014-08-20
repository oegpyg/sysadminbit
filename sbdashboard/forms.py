import datetime
from django import forms
from django.forms.extras.widgets import SelectDateWidget
from django.forms.models import modelformset_factory
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, MultiField, Div

class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'required': 'required', 'class': 'form-control input-lg', 'placeholder': 'Usuario'}), required=True, label='')
    password = forms.CharField(widget=forms.TextInput(attrs={'required': 'required', 'class': 'form-control input-lg', 'placeholder': 'Clave'}), required=True, label='')
    company = forms.ChoiceField( label='', choices=(('SYSADMINBIT', 'SYSADMINBIT'),), required=True,widget=forms.Select(attrs={'class': 'form-control input-lg'}))
    remember = forms.BooleanField(label='Recuerdame', initial=False)

    def __init__(self, *args, **kwargs):
        super(LoginForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Fieldset(
                '',
                'username',
                'password',
                'company',
                Div(
                    'remember',
                    css_class="checkbox"
                )
            ),
            ButtonHolder(
                    Submit('submit', 'AUTENTICAR', css_class='btn btn-lg btn-primary btn-block')
                ),
        )

