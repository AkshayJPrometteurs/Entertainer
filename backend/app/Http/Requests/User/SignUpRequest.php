<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'mobile' => 'required|unique:users,mobile|min:10',
            'password' => 'required',
        ];
    }
    public function messages()
    {
        return [
            'email.required' => '',
            'mobile.required' => '',
            'mobile.min' => 'Please enter 10 digit mobile number.',
        ];
    }
}
