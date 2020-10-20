import { ArrayList } from "../array-list";

type ByteList = ArrayList<number>;

export class Bucket<V> {

    private list = new ArrayList<{ key: ByteList, value: V }>(2);

    public find = (key: ByteList) => this.list.find(x => x.key.isEqual(key));
    public has = (key: ByteList) => typeof this.find(key) !== "undefined";

    public set = (key: ByteList, value: V) => {
        if (this.has(key)) {
            this.find(key)!.value = value;
        } else {
            this.list.add({ key, value });
        }
    }

}