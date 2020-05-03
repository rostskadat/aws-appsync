import { Deserializable } from 'frontend/app/models/deserializable';

/**
 * The {@link Catalog} represent a catalog in the backend
 */
export class Catalog implements Deserializable {

  /**
   * The `id` of the {@link Catalog}
   */
  public id: number;

  /**
  * The `name` of the {@link Catalog}
   */
  public name: string;

  /**
  * The `description` of the {@link Catalog}
   */
  public description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.name = input.name
    this.description = input.description
    return this;
  }

  deserializeList(inputList: any[]) {
    let catalogs: Catalog[] = [];
    inputList.forEach(function(input) {
      catalogs.push(new Catalog().deserialize(input))
    });
    return catalogs;
  }}
