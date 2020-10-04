import { ArrayList } from "structures/array-list";
import { ByteList } from "types/byte-list";

export class Bucket<V> {

    private list = new ArrayList<{ key: ByteList, value: V }>(2);

    public add = (key: ByteList, value: V) => this.list.add({ key, value });

    public find = (key: ByteList) => this.list.find(x => x.key.isEqual(key));

}