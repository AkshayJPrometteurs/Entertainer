<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class VideoRequest extends FormRequest
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
            'subcategory' => 'required',
            'video_title' => 'required|unique:videos,video_title',
            'poster' => 'required',
            'duration' => 'required',
            // 'released_year' => 'required',
            // 'star_casts' => 'required',
            // 'director' => 'required',
            'language' => 'required',
            'captions' => 'required',
            'status' => 'required',
            'upload_video' => 'required',
            // 'upload_video_url' => 'required',
            'description' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'video_title.required' => '',
        ];
    }
}
