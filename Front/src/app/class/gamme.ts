export class Gamme {
  id?: number;
  libelle: string;
  dateCreation: Date;
  custom: boolean ;
  finitionExt: string;
  typeIsolation: string;
  typeCouverture: string;
  qualiteHuisseries: string;
  conceptionOssature: string;
  finitionInterieur: string;

    constructor( _libelle: string,
    _dateCreation: Date,
    _custom: boolean ,
     _finition_ext_id: string    ,
     _type_isolation_id: string    ,
     _type_couverture_id : string    ,
     _qualite_huisseries_id: string    ,
     _conception_ossature_id: string,
     _finitionInterieur_id: string
     )
    {
        this.libelle = _libelle;
        this.dateCreation = _dateCreation;
        this.custom = _custom;
        this.finitionExt = _finition_ext_id;
        this.typeIsolation = _type_isolation_id;
        this.typeCouverture = _type_couverture_id;
        this.qualiteHuisseries = _qualite_huisseries_id;
        this.conceptionOssature =        _conception_ossature_id;
        this.finitionInterieur =        _finitionInterieur_id;


        console.log(this.libelle +
        this.finitionExt +
        this.typeIsolation +
        this.typeCouverture +
        this.qualiteHuisseries +
        this.conceptionOssature);
    }

}
