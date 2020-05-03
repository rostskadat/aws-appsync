/**
 * Contains a generic interface that all model should implements
 *
 * @packageDocumentation
 */

/**
 * The {@link Deserializable} interface must be implemented by all models, and
 * allows the different service to work with strongly typed object
 */
export interface Deserializable {

  /**
   * Given an input this method should return a new instance of the class that
   * implement this interface
   *
   * @param input an Object
   *
   * @returns an instance of the class that implements this interface
   *
   */
  deserialize(input: any): this;
}
