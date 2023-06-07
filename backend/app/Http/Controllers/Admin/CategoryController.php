<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CategoryRequest;
use App\Models\Admin\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function category_list(){
        $category = Category::get();
        return response()->json([
            'status' => 200,
            'data' => $category
        ]);
    }

    public function category_store(CategoryRequest $request){
        $request->validated();
        $category = new Category();
        $category->category_name = $request->category_name;
        $category->category_slug = Str::slug($request->category_name);
        if($request->show_on_user_page != ''){
            if($request->show_on_user_page == true){
                $category->show_on_user_page = 'yes';
            }else{
                $category->show_on_user_page = 'no';
            }
        }else{
            $category->show_on_user_page = 'no';
        }
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'msg' => 'Category Added Successfully'
        ]);
    }
}
