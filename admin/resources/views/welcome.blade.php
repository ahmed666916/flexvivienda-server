<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FlexVivienda</title>
</head>
<body style="margin:0; font-family:Arial, sans-serif; background:linear-gradient(135deg, #2b5876, #4e4376); color:#fff; min-height:100vh; display:flex; align-items:center; justify-content:center; text-align:center;">

    <div style="max-width:600px; padding:40px; background:rgba(255,255,255,0.07); border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.3);">
        <h1 style="font-size:2.5rem; margin-bottom:15px; font-weight:700;">Welcome to FlexVivienda</h1>
        <p style="font-size:1.1rem; line-height:1.6; margin-bottom:30px;">
            A modern platform to manage, explore, and optimize your housing projects.  
            Fast, secure, and built for your needs.
        </p>

        @if (Route::has('login'))
            <div style="display:flex; gap:15px; justify-content:center; flex-wrap:wrap;">
                @auth
                    <a href="{{ url('/dashboard') }}" 
                       style="text-decoration:none; background:#2196F3; color:#fff; padding:12px 25px; border-radius:6px; font-size:1rem; font-weight:600; box-shadow:0 4px 8px rgba(0,0,0,0.2);">
                       Go to Dashboard
                    </a>
                @else
                    <a href="{{ route('login') }}" 
                       style="text-decoration:none; background:#ff6f61; color:#fff; padding:12px 25px; border-radius:6px; font-size:1rem; font-weight:600; box-shadow:0 4px 8px rgba(0,0,0,0.2);">
                       Log in
                    </a>

                   
                @endauth
            </div>
        @endif
    </div>

</body>
</html>
