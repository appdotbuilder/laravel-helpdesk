<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('customer_id')->comment('Customer identification number');
            $table->string('customer_name')->comment('Customer full name');
            $table->text('customer_address')->comment('Customer address');
            $table->text('problem_description')->comment('Issue/problem description');
            $table->enum('priority', ['Low', 'Medium', 'High', 'Urgent'])->default('Medium')->comment('Ticket priority level');
            $table->enum('category', ['Broadband', 'Dedicated', 'Reseller'])->comment('Customer category');
            $table->enum('status', ['New', 'In Progress', 'Pending', 'Cancel', 'Solved', 'Investigation'])->default('New')->comment('Ticket status');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamp('resolved_at')->nullable()->comment('When ticket was resolved');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('customer_id');
            $table->index('priority');
            $table->index('category');
            $table->index('status');
            $table->index('created_by');
            $table->index(['status', 'priority']);
            $table->index(['created_at', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};