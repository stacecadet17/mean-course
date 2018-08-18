import { Component, OnInit, OnDestroy } from '@angular/core'; 
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
    //the tag we use in the the app-html:
    selector: 'app-post-list',
    //this component's specific html file:
    templateUrl: './post-list.component.html',
    //this component's css file:
    styleUrls: ['./post-list.component.css']
})

//export this component as a class:
export class PostListComponent implements OnInit, OnDestroy {
   
    //import the post model that we created so our program knows exactly what a post object should contain everytime.
    posts: Post [] = [];
    private postsSub: Subscription;
    
    constructor(public postsService: PostsService) {}

// ngOnInit is a function that is automatically called when this component is initialized. Any functionality 
// the we want to have happen intially goes here.
    ngOnInit() {
        this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post []) => {
            this.posts = posts;
        });
    }

    onDelete(postId: string) {
        this.postsService.deletePost(postId);
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
}