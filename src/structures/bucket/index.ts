import { ArrayList } from "structures/array-list";
import { Identifiable } from "types/identifiable";

interface BucketNode<K extends Identifiable, V> {
    key: K,
    value: V,
    next?: BucketNode<K, V>,
}

export class Bucket<K extends Identifiable, V> {

    private list = new ArrayList<{ key: K, value: V }>();

    public add = (key: K, value: V) => this.list.add({ key, value });

    public find = (key: K)  => this.list.find(x => x.key.id === key.id);

}