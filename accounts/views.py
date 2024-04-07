from django.shortcuts import render ,redirect ,HttpResponseRedirect
from django.contrib.auth.models import User , auth
from django.contrib import messages
# from . models import user
from django.core.mail import send_mail
# this user is used for model created
from django.urls import reverse
#  reverse is used to direct to back page
from django.views.decorators.cache import cache_control
from django.conf import settings


class Password:
    def __init__(self,string):
        self.string = string
    def capital(self):
        y=0
        for x in self.string:
            for o in range(65,91):
                z=chr(o)
                if x==z:
                    y+=1
        return y            
    def small(self):
        y=0
        for x in self.string:
            for o in range(97,123):
                z=chr(o)
                if x==z:
                    y+=1
        return y            
    def sp(self):
        y=0 
        for x in self.string:
            for o in range(33,47):
                z=chr(o)
                if x==z:
                    y+=1
        return y            
    def nm(self):
        y=0
        for x in self.string:
            for o in range(48,57):
                z=chr(o)
                if x==z:
                    y+=1
        return y  

def acct(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    else:

        username = request.POST['username']
        email = request.POST['email']
        password1 = request.POST['password']
        password2 = request.POST['confirm_password']
        if password1==password2:
            p = Password(password1)
        # Check for empty fields
            if not username or not email or not password1 or not password2:
                messages.info(request, 'Fill in all the fields.')
                return render(request, 'register.html')
        
        
            # Validate the password
            elif p.capital()>=1 and p.nm()>=1 and p.small()>=1 and p.sp()>=1 and len(password1)>=8:
            
            # Check if username and email already exist
                if User.objects.filter(username=username).exists():
                    messages.info(request, 'This username is already taken.')
                    return render(request, 'register.html')
                if User.objects.filter(email=email).exists():
                    messages.info(request, 'This email is already in use.')
                    return render(request, 'register.html')
               
                else: 
                    use = User.objects.create_user(
                        username=username,
                        password=password1,
                        email=email
                        )
                    use.save()
                    messages.success(request, 'Account created successfully.')
                    return render(request, 'register.html')
        else:
            messages.info(request, "Invalid Password")
            return render(request, 'register.html')
# def loggedin(request):
#     # request.method used for form filling request
#     #  request.path used for url request
#     if request.path == '/account/login/':
#         if request.user.is_authenticated:
#             return redirect('')
#         elif request.method =='POST':
#             username = request.POST['username']
#             password = request.POST['password']
#             acct_holder = auth.authenticate(username=username , password=password)
#             if acct_holder is not None:
#                 auth.login(request, acct_holder)
#                 return redirect('')
#             else:
#                 messages.info(request , 'Invalid username/password')
#                 return render(request , 'login.html')
#         else:
#             return render(request , 'login.html')
   
#     if request.path == '/account/logout/':
#         auth.logout(request)
#         return redirect('/')

def login(request):
    if request.method=='GET':
        return render(request,'login.html')    
    else:
        username = request.POST['username'] 
        password = request.POST['password']
        
        user = auth.authenticate(username=username , password=password)
        
        if user is not None:
            auth.login(request,user)
            return redirect('/')
        else:
            messages.info(request , 'Invalid username or password')
            return redirect('login')

def webcam(request):
    return render(request,'webcam.html')

def logout(request):
    auth.logout(request)
    return redirect('/')

def public(request):
    return render(request , 'public.html')

def voice(request):
    return render(request , 'recorder.html')
