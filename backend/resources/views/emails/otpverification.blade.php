<x-mail::message>
# Hello, {{ ucfirst($mail_data['name']) }}

Your One Time Password Shown Below,

# {{ $mail_data['otp'] }}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
