<x-mail::message>
# Hello, {{ ucfirst($mail_data['name']) }}

Your are registred successfully to our {{ config('app.name') }} app.<br>
Now you can login our system and access your account.

<x-mail::button :url="'http://localhost:3000'">
Login Now
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
