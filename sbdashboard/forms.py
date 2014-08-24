import datetime
from django import forms
from django.forms.extras.widgets import SelectDateWidget
from django.forms.models import modelformset_factory
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, MultiField, Div

class LoginForm(forms.Form):
    username = forms.CharField(widget=forms.TextInput(attrs={'required': 'required', 'class': 'form-control input-lg', 'placeholder': 'Users'}), required=True, label='', error_messages={'required': 'Authentication Error'})
    password = forms.CharField(widget=forms.PasswordInput(attrs={'required': 'required', 'class': 'form-control input-lg', 'placeholder': 'Password'}), required=True, label='', error_messages={'required': 'Authentication Error'})
    company = forms.ChoiceField(label='', choices=(('SYSADMINBIT', 'SYSADMINBIT'),), required=True, widget=forms.Select(attrs={'class': 'form-control input-lg'}), error_messages={'required': 'Authentication Error'})
    remember = forms.BooleanField(label='RememberMe', initial=False, error_messages={'required': 'Authentication Error'})

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
                Submit('submit', 'ENTER', css_class='btn btn-lg btn-primary btn-block')
            ),
        )
