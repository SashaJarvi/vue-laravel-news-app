@extends('layouts.app')
@section('content')
    <div id="app">
        <div class="row mt-5">
            <div class="col-12 p-3">
                <article-component></article-component>
            </div>
        </div>

        <hr>

        <div class="row">
            <form action="">
                <div class="mb-3">
                    <label for="commentSubject" class="form-label">Тема комментария</label>
                    <input type="text" class="form-control" id="commentSubject">
                </div>

                <div class="mb-3">
                    <label for="commentBody" class="form-label">Тема комментария</label>
                    <textarea class="form-control" id="commentBody" rows="3"></textarea>
                </div>

                <button class="btn btn-success">Отправить</button>
            </form>

            <div class="toast-container position-relative pb-5 mt-5 mx-auto w-100">
                @foreach($article->comments as $comment)
                    <div class="toast show w-100">
                        <div class="toast-header">
                            <img src="https://via.placeholder.com/50/5F113B/FFFFFF/?text=User" class="rounded me-2" alt="...">
                            <strong class="me-auto">{{$comment->subject}}</strong>
                            <small class="text-muted">{{$comment->createdAtForHumans()}}</small>
                        </div>
                        <div class="toast-body">
                            {{$comment->body}}
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection

@section('vue')
    <script src="{{ mix('/js/app.js') }}"></script>
@endsection
