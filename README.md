angular-div-scroll-spy
======================

Based on [Angular-Scrollspy](http://alxhill.com/blog/articles/angular-scrollspy/ "Angular-Scrollspy"), this Reversion allows it to spy inside scrollable elements.

**Work in Progress :)**

## Options ##

Default active class is "active", overwrite it with `spy-class="<active-class>"`

Default scrollable div container can be changed by refering to a element id, e.g. `scroll-spy="<id-of-scrollable-element>"`


## Example ##

	<div scroll-spy>
	  <div class="nav">
	    <ul>
		  <li><a href="" spy="section-1">Section 1</a></li>
		  <li><a href="" spy="section-2">Section 2</a></li>
		</ul>
	  </div>

      <section id="section-1">
        ...
	  </section>

      <section id="section-2">
        ...
	  </section>
	
	</div>


## ToDo: ##

- Decuple from jQuery
- Test


