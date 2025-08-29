<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTicketRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id' => 'required|string|max:255',
            'customer_name' => 'required|string|max:255',
            'customer_address' => 'required|string',
            'problem_description' => 'required|string',
            'priority' => 'required|in:Low,Medium,High,Urgent',
            'category' => 'required|in:Broadband,Dedicated,Reseller',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'customer_id.required' => 'Customer ID is required.',
            'customer_name.required' => 'Customer name is required.',
            'customer_address.required' => 'Customer address is required.',
            'problem_description.required' => 'Problem description is required.',
            'priority.required' => 'Priority level is required.',
            'priority.in' => 'Priority must be one of: Low, Medium, High, Urgent.',
            'category.required' => 'Customer category is required.',
            'category.in' => 'Category must be one of: Broadband, Dedicated, Reseller.',
        ];
    }
}