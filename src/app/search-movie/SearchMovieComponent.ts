import { Component, OnInit } from '@angular/core';
import { /* FormControl, FormGroup, */ AbstractControl, FormBuilder, ValidationErrors, Validators,ValidatorFn } from '@angular/forms';
import { SearchFormModel } from '../searchform.model';




@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css']
})
export class SearchMovieComponent implements OnInit {
  /* searchform = new FormGroup({
    identifiant: new FormControl(""),
    titre: new FormControl(""),
    type : new FormGroup ({
      film : new FormControl(""),
      serie : new FormControl(""),
      episode : new FormControl("")}),
    anneeDeSortie : new FormControl(""),
    fiche : new FormGroup ({
      long : new FormControl(""),
      courte : new FormControl(""),
      }),
    
 
    esta es una manera de escribir el formgroup
  }); */
  /* con el formBuilder, se escribe así : */
  
  
  minYear = 1900;
  maxYear = new Date().getFullYear(); /* estas propiedades son para el validatores rangedata del input année de sortie */
  
  searchform = this.fb.group({
    infos: this.fb.group({
      identifiant: [""],
      titre: [""],
      }),
      /* hay un montón de validators en la doc Angular que se pueden combinar && || entre sí, para evitar los custom validators, que puden ser comlejos  */
      
   /*  validator: this.isRequiredValidator('titre', 'identifiant'), */
    type: ["serie"],
    anneeDeSortie: ["", [Validators.required, this.rangeDataValidator(this.minYear, this.maxYear) ]],
    fiche: [""]
  });


  onSubmit() {
  
    const model:SearchFormModel = this.searchform.value; 
    console.log(JSON.stringify(model));
  }

  isRequiredValidator(identifiant: string, titre: string):ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const identifiantControl = control.get(identifiant); /* se ha utilizado get para recuperar los controle. Como de costumbre el binding se hace con el FormNameControl, y eso es lo que se recupera aquí. No hace falta la sintaxis GET, pero es para ver cómo funciona */
      const titreControl = control.get(titre);
    
    if (identifiantControl?.value || titreControl?.value) { /* se pone la condición, y si una da las dos da null (o sea, no rellenada), salta el isRequired:true para decirte que lo tienes que rellenar */
      return null;
    }

    return {'isRequired':true}
  };}

  rangeDataValidator(min:number, max:number) { /* es un validator con la misma base. Si en algún momento tienes muchos validators, quizás sea interesante crear un fichero ts validators */
    return (control: AbstractControl): ValidationErrors | null => {
      const triggerYear = control.value; /* se recupera el valor del input al que se le va a asignar en validator (anneéDeSortie) */
    
    if (triggerYear >=min && triggerYear <= max) { /* lo mismo que más arriba, se pone la condición */
      return null;
    }

    return { 'min' : {min, max} } /* se envía un error de salida 'min', con los valores mínimo y máximo */
    ;
  }
} 
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.searchform.patchValue({ fiche: "courte" }); /* se usa el patchvalue para cambiar el valor de type, tal y como indica la misión */
    this.searchform.valueChanges.subscribe(value => { /* se inicia el suscribe para ver los cambios en el form */
      console.log(value);
    });

    this.searchform.get("infos.identifiant")?.valueChanges.subscribe(value => {
      console.log(value);
    });
    this.searchform.controls?.["type"].valueChanges.subscribe(value => {
      console.log(value);
    });
  
  
  
  }

}
