/**
 * This contains a pipe that is used to filter a list of object on on (or more
 * of its attributes)
 *
 * @packageDocumentation
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterOnAttributes'
})
export class FilterOnAttributesPipe implements PipeTransform {

  /**
   * Implements the {@link PipeTransform | PipeTransform interface}: given list
   * of `items`, returns the list of items for which at least one attribute
   * matches the `filter` string

   * @param items The list of items to filter. If it is null or empty the empty
   *  list is returned
   * @param filter The string to filter on
   * @param filterOnAttributes The list possibly empty of attributes name to filter on
   * @returns The list of items matching the filter criteria
   */
  transform(items: any[], filter: string, filterOnAttributes: string[]): any[] {
    if (!items) return [];
    if (!filter) return items;
    return items.filter(it => {
      for (let attribute of filterOnAttributes) {
        if (it.hasOwnProperty(attribute) && it[attribute].includes(filter)) {
          return true
        }
      }
      return false
    });
  }

}
