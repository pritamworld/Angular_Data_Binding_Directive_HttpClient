# Week11TueHttpDirectives

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Code Enhansement

## Key Enhancements on API Client

* Global Error Handling (catchError): Network requests fail. Adding a centralized handleError catches connection failures or backend errors gracefully before they break your components.
* Better Type Safety (Omit and Partial):
* When creating a post, you usually don't send an id because the server makes it. Omit<Post, 'id'> reflects this.
  * When updating, you might only pass changed fields, so Partial<Post> prevents typing errors if fields are missing.
* Stream Performance (shareReplay): Adding shareReplay(1) to getPosts() caches the last emission. If multiple UI components subscribe to this list simultaneously, it triggers only one network request instead of duplicating fetches.
* Accurate HTTP DELETE Type: Angular's http.delete typed as void can sometimes throw runtime issues depending on whether the API returns an empty body or a status message. Typing it as unknown or Object is safer.


## Key Enhancements on Post List

* Eliminated OnInit and manual subscriptions: Instead of setting up ngOnInit and subscribing to multiple streams, data fetching is declarative through rxResource. It exposes native signals like .isLoading() and .error() automatically.
* Safer Async Execution: Mutating methods (create, delete, update) now utilize firstValueFrom paired with async/await. This guarantees requests auto-complete, meaning zero risk of subscription memory leaks, while eliminating deep .pipe(catchError()) clutter.
* Signal-Driven Reactive Local State: Since the resource data is a read-only stream, mutations are applied cleanly via a localMutations signal. The template reads a computed merger (this.postList()), keeping state predictable without directly reassigning data buffers.
* Leveraged Updated API Signatures: Incorporates the Omit<Post, 'id'> and Partial<Post> parameters introduced in the service layer refactor, maintaining type cohesion across boundaries.

## Key Enhancements for Post List html

* Signal Invocation (postList(), isLoading()): Because postList, isLoading, and errorMsg are now Signals, you must append parentheses () to read their current values dynamically.
* Modern @for Block Compatibility: Recent versions of Angular support pairing the built-in @for control flow syntax inside <cdk-virtual-scroll-viewport>. This allows you to completely eliminate the need for legacy structural directives like *cdkVirtualFor or*ngIf.
* State-Aware UI Feedbacks (@if, @empty): Added conditional UI elements to display a loading message and error banners. The built-in @empty placeholder seamlessly replaces the list container if the collection evaluates to an empty array.
* Adjusted Virtual Scroll Size: Changed itemSize from 10 to 60. An itemSize of 10 pixels is typically too small for a complex child layout like <app-postdetails>. Setting a size that closely matches your real CSS layout height prevents rapid list flickering or layout shifts while scrolling.


We can make your interface much cleaner, more resilient, and self-documenting.
In modern TypeScript, it is best practice to avoid relying heavily on optional properties (?) directly on the base model if that model represents a real record from your database. Instead, you should keep the core entity strict and use TypeScript Utility Types where data shapes deviate.

## Improved Post Model File

* Immutable readonly id: The id of a post should never change once it is issued by the database. Marking it readonly prevents accidental bugs where code accidentally modifies a post's lookup index.
* Separation of Concerns: A post fetched from the API always has an ID. Making id? optional on the base model makes the type weaker everywhere else in your app (forces you to write if (post.id) guards everywhere).
* Exported Payload Helpers: By exporting CreatePostPayload and UpdatePostPayload directly alongside the interface, you keep your service layer and component layer clean.

