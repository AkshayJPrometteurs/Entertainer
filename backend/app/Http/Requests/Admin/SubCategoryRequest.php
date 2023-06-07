<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class SubCategoryRequest extends FormRequest
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
            'category' => 'required',
            'sub_category_name' => 'required',
            'icon' => 'required',
            'status' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'sub_category_name.required' => '',
        ];
    }
}
