from django.shortcuts import render

# Create your views here.
from .models import features

# Create your views here.
dests = features.objects.all()
def home(request):
    
    dests = features.objects.all()
    
    return render(request,'index.html', {'dests':dests })