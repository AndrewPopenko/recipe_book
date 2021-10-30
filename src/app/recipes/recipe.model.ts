export class RecipeModel {
  public name: string;
  public description: string;
  public imgPath: string;

  constructor(name: string, desc: string, imagePath: string) {
    this.name = name;
    this.description = desc;
    this.imgPath = imagePath;
  }
}


export class RecipeEventModel {
  id = -1;
  isClicked = false;
}
