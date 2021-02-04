export class Modele {
 id?: number;
   dateCreation:Date;
  custom: boolean ;
    libelle: string;
     nbEtage: number;
     gamme: string;
     typeRemplissage  :string;
     coupeDePrincipe : string;



     constructor(_libelle: string,
         _dateCreation:Date,
         _custom: boolean ,
          _nbEtage :number    ,
          _gamme :string    ,
          _type_remplissage_id  :string    ,
          _coupe_de_principe_id:string
          )
         {
             this.libelle = _libelle;
             this.dateCreation = _dateCreation;
             this.custom = _custom;
             this.nbEtage = _nbEtage;
             this.gamme = _gamme;
             this.typeRemplissage = _type_remplissage_id;
             this.coupeDePrincipe = _coupe_de_principe_id;


         }

}
