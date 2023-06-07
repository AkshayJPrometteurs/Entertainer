<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AllShowsDetailsRequest extends FormRequest
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
            'shows_type' => 'required',
            'shows_name' => 'required|unique:all_shows_details,shows_name',
            'shows_image' => 'required',
            'shows_status' => 'required',
        ];
    }
}
