import { InnerComponentComponent } from './inner-component/inner-component.component';
import { Component, ElementRef, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('iframe', {static: false}) iframe: ElementRef;

  firstInput = 5;
  doc;
  compRef: ComponentRef<InnerComponentComponent>;

  constructor(private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver) { }

  onLoad(iframe){
    this.doc = iframe.contentDocument || iframe.contentWindow;
    this.createComponent();
  }

  createComponent() {
    const compFactory = this.resolver.resolveComponentFactory(InnerComponentComponent);
    this.compRef = this.vcRef.createComponent(compFactory);
    this.compRef.location.nativeElement.id = 'innerComp';

    (<InnerComponentComponent>this.compRef.instance).firstInput = this.firstInput;

    (<InnerComponentComponent>this.compRef.instance).emitOutput.subscribe(response => {
      console.log("jhere ",response);
    });

    this.doc.body.appendChild(this.compRef.location.nativeElement);
  }
}
