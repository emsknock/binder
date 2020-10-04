import { ArrayList } from "structures/array-list";
import { Identifiable } from "types/identifiable";

export class Bucket<K extends Identifiable, V> {

    private list = new ArrayList<{ key: K, value: V }>(2);

    public add = (key: K, value: V) => this.list.add({ key, value });

    public find = (key: K)  => this.list.find(x => x.key.id === key.id);

}