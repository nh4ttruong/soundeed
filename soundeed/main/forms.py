from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, ButtonHolder, Submit, Field

class NewUserForm(UserCreationForm):
	username = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control','type':'text','name': 'username','placeholder':'Username'}),label="Username")
	email = forms.EmailField(widget=forms.TextInput(attrs={'class': 'form-control','type':'text','name': 'email','placeholder':'Email'}), label="Email")
	password1 = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','type':'password', 'name':'password1', 'placeholder':'Password'}),label="Password")
	password2 = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control','type':'password', 'name': 'password2', 'placeholder':'Password again'}),label="Password again")

	class Meta:
		model = User
		fields = ['username', 'email','password1','password2']
		field_order = ['email','password1','password2']
	
	def __init__(self, *args, **kwargs):
		super(NewUserForm, self).__init__(*args, **kwargs)
		helper = self.helper = FormHelper()
		self.helper.layout = Layout(
            Fieldset(
                'username',
                'email',
                'password1',
                'password2',
            ),
            ButtonHolder(
                Submit('submit', 'Submit', css_class='button white')
            )
        )
		# Moving field labels into placeholders
		layout = helper.layout = Layout()
		for field_name, field in self.fields.items():
			layout.append(Field(field_name, placeholder=field.label))
		helper.form_show_labels = False

	def save(self, commit=True):
		user = super(NewUserForm, self).save(commit=False)
		user.email = self.cleaned_data['email']
		if commit:
			user.save()
		return user

