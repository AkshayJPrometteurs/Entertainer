<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\SubCategoryRequest;
use App\Models\Admin\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    public function sub_category_list(){
        $sub_category = SubCategory::join('categories','categories.id','=','category')
        ->select('sub_categories.*','categories.category_name')
        ->get();
        return response()->json([
            'status' => 200,
            'data' => $sub_category
        ]);
    }

    public function categorywise_sub_category_list($category){
        $sub_category = SubCategory::where('category',$category)->get();
        return response()->json([
            'status' => 200,
            'data' => $sub_category
        ]);
    }

    public function sub_category_store(SubCategoryRequest $request){
        $request->validated();
        $iconName = null;
        if($request->hasFile('icon')){
            $iconName = 'IconName_'.rand('1111111111','9999999999').'.'.$request->file('icon')->getClientOriginalExtension();
            $request->file('icon')->move('assets/images/Icons/',$iconName);
        }
        SubCategory::create([
            'category' => $request->category,
            'sub_category_name' => $request->sub_category_name,
            'sub_category_slug' => Str::slug($request->sub_category_name),
            'icon' => $iconName,
            'status' => $request->status,
        ]);
        return response()->json([
            'status' => 200,
            'msg' => 'Sub-Category Added Successfully'
        ]);
    }
}
