<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function add(Request $request) {
        if (!$request->has('content')) return response('invalid values', 400);

        $data = [
            'content' => $request->input('content'),
            'owner' => Auth::id(),
            'created_at' => time(),
            'updated_at' => time()
        ];

        $id = Todo::create($data)['id'];
        
        return [
            'status' => 'success',
            'data' => [ 'id' => $id ]
        ];
    }

    public function getAll(Request $request) {
        $user = Auth::user();
        $query = Todo::orderBy('created_at', 'desc');
        
        $query = $user['role'] === 'admin' ? $query : $query->where('owner', $user['id']);
        $query = $query->where('content', 'like', "%{$request->query('searchText')}%");

        $totalCount = $query->count();
        $data = $query->skip($request->query('page', 0) * 10)->limit(10)->get();

        return [
            'data' => $data,
            'totalCount' => $totalCount
        ];
    }

    public function remove(int $id) {
        $user = Auth::user();
        $delete = Todo::where('id', $id);

        if ($user['role'] !== 'admin') $delete = $delete->where('owner', $user['id']);

        return [
            'status' => $delete->delete() ? 'success' : 'failed'
        ];
    }

    public function update(Request $request, int $id) {
        if (!$request->hasAny(['content', 'done'])) return response('invalid values', 400);
        if ($request->has('content')) $data['content'] = $request->input('content');
        if ($request->has('done')) $data['done'] = $request->input('done') === 'true';
        
        $user = Auth::user();
        $update = Todo::whereId($id);

        if ($user['role'] !== 'admin') $update = $update->where('owner', $user['id']);

        return [
            'status' => $update->update($data) ? 'success' : 'failed'
        ];
    }
}
